// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20PermissionsControl is ERC20, AccessControl, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    // 역할 정의하기
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant FREEZE_MANAGER_ROLE = keccak256("FREEZE_MANAGER_ROLE");
    bytes32 public constant BLACKLIST_MANAGER_ROLE = keccak256("BLACKLIST_MANAGER_ROLE");
    bytes32 public constant RECOVER_ROLE = keccak256("RECOVER_ROLE");

    // 상태 변수
    EnumerableSet.AddressSet private frozenAccounts;
    EnumerableSet.AddressSet private blacklistedAccounts;

    // 생성자: 이름, 심볼, 기본 관리자= msg.sender
    // 기본적으로 토큰을 만든 계정은 모든 권한을 가지고 있음
    constructor(string memory name, string memory symbol) 
        ERC20(name, symbol) 
        Ownable(msg.sender)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // 민트 함수: MINTER_ROLE만 가능
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // 번 함수: BURNER_ROLE만 가능
    function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    // 계정 동결 함수: FREEZE_MANAGER_ROLE만 가능
    // frozenAccounts 상태변수에 계정 추가
    // 동결 시 전송 기능 사용 불가
    function freezeAccount(address account) external onlyRole(FREEZE_MANAGER_ROLE) {
        require(!frozenAccounts.contains(account), "Account is already frozen");
        frozenAccounts.add(account);
    }

    // 계정 동결 해제 함수: FREEZE_MANAGER_ROLE만 가능
    function unfreezeAccount(address account) external onlyRole(FREEZE_MANAGER_ROLE) {
        require(frozenAccounts.contains(account), "Account is not frozen");
        frozenAccounts.remove(account);
    }

    // 블랙리스트 추가 함수: BLACKLIST_MANAGER_ROLE만 가능
    // blacklistedAccounts 상태변수에 계정 추가
    // 블랙리스트 등록 시 전송 기능 사용 불가
    function blacklistAccount(address account) external onlyRole(BLACKLIST_MANAGER_ROLE) {
        require(!blacklistedAccounts.contains(account), "Account is already blacklisted");
        blacklistedAccounts.add(account);
    }

    // 블랙리스트 제거 함수: BLACKLIST_MANAGER_ROLE만 가능
    function removeFromBlacklist(address account) external onlyRole(BLACKLIST_MANAGER_ROLE) {
        require(blacklistedAccounts.contains(account), "Account is not blacklisted");
        blacklistedAccounts.remove(account);
    }

    // 토큰 복구 함수: RECOVER_ROLE만 가능
    // 원하는 계정에서 다른 계정으로 토큰 전송 가능!
    function recover(address from, address to, uint256 amount) external onlyRole(RECOVER_ROLE) {
        _transfer(from, to, amount); // Use the internal transfer provided by ERC20
    }

    // transfer 함수: 동결 및 블랙리스트 상태 확인
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(!frozenAccounts.contains(msg.sender), "Sender account is frozen");
        require(!frozenAccounts.contains(to), "Recipient account is frozen");
        require(!blacklistedAccounts.contains(msg.sender), "Sender account is blacklisted");
        require(!blacklistedAccounts.contains(to), "Recipient account is blacklisted");

        return super.transfer(to, amount); // Call the parent ERC20 transfer function
    }

    // transferFrom 함수: 동결 및 블랙리스트 상태 확인
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(!frozenAccounts.contains(from), "Sender account is frozen");
        require(!frozenAccounts.contains(to), "Recipient account is frozen");
        require(!blacklistedAccounts.contains(from), "Sender account is blacklisted");
        require(!blacklistedAccounts.contains(to), "Recipient account is blacklisted");

        return super.transferFrom(from, to, amount); // Call the parent ERC20 transferFrom function
    }



    // <===여기부터 ROLE 관리 함수들

    // MINTER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addMinter(address account) external onlyOwner {
        grantRole(MINTER_ROLE, account);
    }

    // MINTER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeMinter(address account) external onlyOwner {
        revokeRole(MINTER_ROLE, account);
    }

    // BURNER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addBurner(address account) external onlyOwner {
        grantRole(BURNER_ROLE, account);
    }

    // BURNER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeBurner(address account) external onlyOwner {
        revokeRole(BURNER_ROLE, account);
    }

    // FREEZE_MANAGER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addFreezer(address account) external onlyOwner {
        grantRole(FREEZE_MANAGER_ROLE, account);
    }

    // FREEZE_MANAGER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeFreezer(address account) external onlyOwner {
        revokeRole(FREEZE_MANAGER_ROLE, account);
    }

    // BLACKLIST_MANAGER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addBlacklistManager(address account) external onlyOwner {
        grantRole(BLACKLIST_MANAGER_ROLE, account);
    }

    // BLACKLIST_MANAGER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeBlacklistManager(address account) external onlyOwner {
        revokeRole(BLACKLIST_MANAGER_ROLE, account);
    }

    // RECOVER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addRecoverer(address account) external onlyOwner {
        grantRole(RECOVER_ROLE, account);
    }

    // RECOVER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeRecoverer(address account) external onlyOwner {
        revokeRole(RECOVER_ROLE, account);
    }

    // 여기까지 ROLE 관리 함수들 ===>
}
