// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract PresaleManager {
    
    mapping(address => address) presaleList; // 토큰 컨트랙트 주소 => 프리세일 컨트랙트

    function addPresale(address _tokenAddress, address _presaleAddress) public {
        presaleList[_tokenAddress] = _presaleAddress;
    }

    function getPresale(address _tokenAddress) public view returns(address) {
        return presaleList[_tokenAddress];
    }
}