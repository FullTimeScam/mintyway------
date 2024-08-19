// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.8.2 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CustomToken is ERC20, AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FREEZER_ROLE = keccak256("FREEZER_ROLE");
    bytes32 public constant BLACKLISTER_ROLE = keccak256("BLACKLISTER_ROLE");
    bytes32 public constant AIRDROP_MANAGER_ROLE = keccak256("AIRDROP_MANAGER_ROLE");
    bytes32 public constant MINER_ROLE = keccak256("MINER_MANAGER_ROLE");

    struct AccountStatus {
        EnumerableSet.AddressSet frozenAccounts;
        EnumerableSet.AddressSet blacklistedAccounts;
        EnumerableSet.AddressSet timeLockedAccounts;
        EnumerableSet.AddressSet minerAccounts;
    }

    AccountStatus private accountStatus;
    mapping(address => uint) private lockTime;

    AirdropContract public airdropContract;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    function _checkRole(bytes32 role, address account) internal view {
        require(hasRole(role, account), "AccessControl: account does not have the required role");
    }

    function _beforeTokenTransfer(address from, address to) internal view {
        require(!isFrozen(from), "ERC20: sender account is frozen");
        require(!isFrozen(to), "ERC20: recipient account is frozen");
        require(!isBlacklisted(from), "ERC20: sender is blacklisted");
        require(!isBlacklisted(to), "ERC20: recipient is blacklisted");
        require(!isLocked(from), "ERC20: sender account is locked");
        require(!isLocked(to), "ERC20: recipient account is locked");
    }

    function mint(address to, uint amount) external onlyRole(ADMIN_ROLE) {
        _mint(to, amount);
    }

    function recoverTokens(address from, address to, uint amount) external onlyRole(ADMIN_ROLE) {
        require(balanceOf(from) >= amount, "Insufficient balance in the account");
        _checkRole(ADMIN_ROLE, msg.sender);
        _transfer(from, to, amount);
    }

    function freezeAccount(address account) external onlyRole(FREEZER_ROLE) {
        require(!accountStatus.frozenAccounts.contains(account), "Account is already frozen");
        accountStatus.frozenAccounts.add(account);
    }

    function unfreezeAccount(address account) external onlyRole(FREEZER_ROLE) {
        require(accountStatus.frozenAccounts.contains(account), "Account is not frozen");
        accountStatus.frozenAccounts.remove(account);
    }

    function isFrozen(address account) public view returns (bool) {
        return accountStatus.frozenAccounts.contains(account);
    }

    function addToBlacklist(address account) external onlyRole(BLACKLISTER_ROLE) {
        require(!accountStatus.blacklistedAccounts.contains(account), "Account is already blacklisted");
        accountStatus.blacklistedAccounts.add(account);
    }

    function removeFromBlacklist(address account) external onlyRole(BLACKLISTER_ROLE) {
        require(accountStatus.blacklistedAccounts.contains(account), "Account is not blacklisted");
        accountStatus.blacklistedAccounts.remove(account);
    }

    function isBlacklisted(address account) public view returns (bool) {
        return accountStatus.blacklistedAccounts.contains(account);
    }

    function lockAccount(address account, uint time) external onlyRole(ADMIN_ROLE) {
        lockTime[account] = time;
        accountStatus.timeLockedAccounts.add(account);
    }

    function getLockTime(address account) public view returns (uint) {
        return lockTime[account];
    }

    function isLocked(address account) public view returns (bool) {
        return accountStatus.timeLockedAccounts.contains(account) && block.timestamp < lockTime[account];
    }

    function unlockAccount(address account) external onlyRole(ADMIN_ROLE) {
        require(accountStatus.timeLockedAccounts.contains(account), "Account is not locked");
        accountStatus.timeLockedAccounts.remove(account);
        lockTime[account] = 0;
    }

    function addToMiner(address account) external onlyRole(MINER_ROLE) {
        require(!accountStatus.minerAccounts.contains(account), "Account is already Miner");
        accountStatus.minerAccounts.add(account);
    }

    function removeFromMiner(address account) external onlyRole(MINER_ROLE) {
        require(accountStatus.minerAccounts.contains(account), "Account is not Miner");
        accountStatus.minerAccounts.remove(account);
    }

    function isMiner(address account) public view returns (bool) {
        return accountStatus.minerAccounts.contains(account);
    }

    function transferWithReward(address to, uint amount, uint ratio) public returns (bool) {
        _beforeTokenTransfer(msg.sender, to);
        uint reward = amount / ratio;
        _mint(msg.sender, reward);
        _mint(to, reward);
        return super.transfer(to, amount);
    }

    function transfer(address to, uint amount) public override returns (bool) {
        _beforeTokenTransfer(msg.sender, to);
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint amount) public override returns (bool) {
        _beforeTokenTransfer(from, to);
        return super.transferFrom(from, to, amount);
    }

    function setAirdropContract(AirdropContract _airdropContract) external onlyRole(AIRDROP_MANAGER_ROLE) {
        airdropContract = _airdropContract;
    }

    function claimAirdrop() external {
        require(address(airdropContract) != address(0), "Airdrop contract not set");
        airdropContract.claimAirdrop();
    }

    function claimAirdropWithoutCondition() external {
        require(address(airdropContract) != address(0), "Airdrop contract not set");
        airdropContract.claimAirdropWithoutCondition();
    }

    function grantRole(bytes32 role, address account) public override onlyRole(getRoleAdmin(role)) {
        super.grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public override onlyRole(getRoleAdmin(role)) {
        super.revokeRole(role, account);
    }

    function burn(uint amount) external onlyRole(ADMIN_ROLE) {
        _burn(msg.sender, amount);
    }
}

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract AirdropContract is AccessControl {
    bytes32 public constant AIRDROP_MANAGER_ROLE = keccak256("AIRDROP_MANAGER_ROLE");

    IERC20 public token;
    uint public airdropAmount;

    struct AirdropCondition {
        uint minBalance;
        uint lockTime;
    }

    mapping(address => AirdropCondition) public airdropConditions;
    mapping(address => bool) public hasClaimed;

    constructor(IERC20 _token, uint _airdropAmount) {
        token = _token;
        airdropAmount = _airdropAmount;
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(AIRDROP_MANAGER_ROLE, msg.sender);
    }

    function setAirdropCondition(address account, uint minBalance, uint lockTime) external onlyRole(AIRDROP_MANAGER_ROLE) {
        airdropConditions[account] = AirdropCondition(minBalance, lockTime);
    }

    function claimAirdrop() external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed");
        AirdropCondition memory condition = airdropConditions[msg.sender];
        require(condition.minBalance > 0 || condition.lockTime > 0, "No airdrop condition set");

        if (condition.minBalance > 0) {
            require(token.balanceOf(msg.sender) >= condition.minBalance, "Balance requirement not met");
        }
        if (condition.lockTime > 0) {
            require(block.timestamp >= condition.lockTime, "Lock time requirement not met");
        }

        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, airdropAmount), "Airdrop transfer failed");
    }

    function claimAirdropWithoutCondition() external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed");

        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, airdropAmount), "Airdrop transfer failed");
    }

    function depositTokens(uint amount) external onlyRole(AIRDROP_MANAGER_ROLE) {
        require(token.transferFrom(msg.sender, address(this), amount), "Token deposit failed");
    }

    function withdrawRemainingTokens() external onlyRole(AIRDROP_MANAGER_ROLE) {
        uint balance = token.balanceOf(address(this));
        require(token.transfer(msg.sender, balance), "Withdrawal failed");
    }
}
