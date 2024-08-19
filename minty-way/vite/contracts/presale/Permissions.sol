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
    bytes32 public constant FREEZER_ROLE = keccak256("FREEZER_ROLE");
    bytes32 public constant BLACKLIST_MANAGER_ROLE = keccak256("BLACKLIST_MANAGER_ROLE");
    bytes32 public constant RECOVER_ROLE = keccak256("RECOVER_ROLE");

    // 상태 변수
    EnumerableSet.AddressSet private frozenAccounts;
    EnumerableSet.AddressSet private blacklistedAccounts;

    // 생성자: 이름, 심볼, 기본 관리자= msg.sender
    // 기본적으로 토큰을 만든 계정은 모든 권한을 가지고 있음
    constructor(string memory name, string memory symbol, uint amout) 
        ERC20(name, symbol) 
        Ownable(msg.sender)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, amout);
        addMinter(msg.sender);
        addBurner(msg.sender);
        addFreezer(msg.sender);
        addBlacklistManager(msg.sender);
        addRecoverer(msg.sender);
    }

    // 민트 함수: MINTER_ROLE만 가능
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // 번 함수: BURNER_ROLE만 가능
    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    // 계정 동결 함수: FREEZER_ROLE만 가능
    // frozenAccounts 상태변수에 계정 추가
    // 동결 시 전송 기능 사용 불가
    // 받는 것은 가능
    function freezeAccount(address account) public onlyRole(FREEZER_ROLE) {
        require(!frozenAccounts.contains(account), "Account is already frozen");
        frozenAccounts.add(account);
    }

    // 계정 동결 해제 함수: FREEZER_ROLE만 가능
    function unfreezeAccount(address account) public onlyRole(FREEZER_ROLE) {
        require(frozenAccounts.contains(account), "Account is not frozen");
        frozenAccounts.remove(account);
    }

    // 계정 동결 확인 함수 : 누구나 가능
    function isFrozen(address account) public view returns (bool) {
    return frozenAccounts.contains(account);
    }

    // 블랙리스트 추가 함수: BLACKLIST_MANAGER_ROLE만 가능
    // blacklistedAccounts 상태변수에 계정 추가
    // 블랙리스트 등록 시 토큰 전송, 수신 불가
    function addToBlacklist(address account) public onlyRole(BLACKLIST_MANAGER_ROLE) {
        require(!blacklistedAccounts.contains(account), "Account is already blacklisted");
        blacklistedAccounts.add(account);
    }

    // 블랙리스트 제거 함수: BLACKLIST_MANAGER_ROLE만 가능
    function removeFromBlacklist(address account) public onlyRole(BLACKLIST_MANAGER_ROLE) {
        require(blacklistedAccounts.contains(account), "Account is not blacklisted");
        blacklistedAccounts.remove(account);
    }

    // 블랙리스트 확인 함수 : 누구나 가능
    function isBlacklisted(address account) public view returns (bool) {
    return blacklistedAccounts.contains(account);
    }


    // 토큰 복구 함수: RECOVER_ROLE만 가능
    // 원하는 계정에서 다른 계정으로 토큰 전송 가능!
    function recover(address from, address to, uint256 amount) public onlyRole(RECOVER_ROLE) {
        _transfer(from, to, amount);
    }

    // 토큰 전송 전에 동결 및 블랙리스트 상태를 확인하는 함수
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        require(!frozenAccounts.contains(owner), "Sender account is frozen");
        require(!blacklistedAccounts.contains(owner), "Sender account is blacklisted");
        require(!blacklistedAccounts.contains(to), "Recipient account is blacklisted");

        return super.transfer(to, amount); // super은 부모 컨트랙트의 함수를 쓰겠다는 뜻임
    }

    // MINTER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addMinter(address account) public onlyOwner {
        grantRole(MINTER_ROLE, account);
    }

    // MINTER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeMinter(address account) public onlyOwner {
        revokeRole(MINTER_ROLE, account);
    }

    // BURNER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addBurner(address account) public onlyOwner {
        grantRole(BURNER_ROLE, account);
    }

    // BURNER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeBurner(address account) public onlyOwner {
        revokeRole(BURNER_ROLE, account);
    }

    // FREEZER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addFreezer(address account) public onlyOwner {
        grantRole(FREEZER_ROLE, account);
    }

    // FREEZER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeFreezer(address account) public onlyOwner {
        revokeRole(FREEZER_ROLE, account);
    }

    // BLACKLIST_MANAGER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addBlacklistManager(address account) public onlyOwner {
        grantRole(BLACKLIST_MANAGER_ROLE, account);
    }

    // BLACKLIST_MANAGER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeBlacklistManager(address account) public onlyOwner {
        revokeRole(BLACKLIST_MANAGER_ROLE, account);
    }

    // RECOVER_ROLE을 추가하는 함수: 오너만 호출 가능
    function addRecoverer(address account) public onlyOwner {
        grantRole(RECOVER_ROLE, account);
    }

    // RECOVER_ROLE을 제거하는 함수: 오너만 호출 가능
    function removeRecoverer(address account) public onlyOwner {
        revokeRole(RECOVER_ROLE, account);
    }
}
