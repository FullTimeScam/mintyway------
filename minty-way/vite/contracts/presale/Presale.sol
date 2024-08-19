// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./PresaleManager.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract Presale {
    struct PresaleInfo {
        address tokenAddress;
        uint launchPrice;
        uint redemptionAmount;
        string subscriptionStartTime;
        string snapshotStartTime;
        string snapshotEndTime;
        string lotteryStartTime;
        string lotteryEndTime;
        string redemptionTime;
    }

    constructor (
        address _presaleManager,
        address _tokenAddress, 
        uint _launchPrice, 
        uint _redemptionAmount, 
        string memory _subscriptionStartTime, 
        string memory _snapshotStartTime, 
        string memory _snapshotEndTime, 
        string memory _lotteryStartTime, 
        string memory _lotteryEndTime,
        string memory _redemptionTime) {
        presaleInfo = PresaleInfo({
            tokenAddress: _tokenAddress, 
            launchPrice: _launchPrice,
            redemptionAmount: _redemptionAmount, 
            subscriptionStartTime: _subscriptionStartTime, 
            snapshotStartTime: _snapshotStartTime, 
            snapshotEndTime: _snapshotEndTime, 
            lotteryStartTime: _lotteryStartTime, 
            lotteryEndTime: _lotteryEndTime, 
            redemptionTime: _redemptionTime
            });
        
        presaleManager = PresaleManager(_presaleManager);
        presaleManager.addPresale(_tokenAddress, address(this));
    }

    struct Snapshot {
        uint blockNumber;
        mapping(address => uint) points;
    }

    PresaleInfo presaleInfo;
    PresaleManager presaleManager;
    Snapshot snapshot;

    mapping(address => uint) ticketAmount;
    mapping(address => bool) public winners;
    mapping(address => bool) subscriber;
    address[] users;

    function subscription() public {
        require(!subscriber[msg.sender], unicode"이미 구독 중입니다.");
        subscriber[msg.sender] = true;
        users.push(msg.sender);
    }

    function isSubscribed() public view returns(bool) {
        return subscriber[msg.sender];
    }

    // function takeSnapshot() public {
    //     snapshot.blockNumber = block.number;
    //     for (uint i = 0; i < users.length; i ++) {
    //         snapshot.points[users[i]] =    
    //     }
    // }

    function purchaseTicket(uint _amount) public payable {
        require(msg.value * _amount >= presaleInfo.redemptionAmount * _amount, unicode"금액이 부족합니다.");
        ticketAmount[msg.sender] += _amount;
    }

    function getTicketAmount() public view returns(uint) {
        return ticketAmount[msg.sender];
    }

    function getWinners(address[] calldata _winners) public {
        for (uint i = 0; i < _winners.length; i ++) {
            winners[_winners[i]] = true;
        }
    }

    function claim() public {
        require(winners[msg.sender], unicode"당첨되지 않았습니다.");
        IERC20 token = IERC20(presaleInfo.tokenAddress);
        bool success = token.transfer(msg.sender, ticketAmount[msg.sender]);
        require(success, unicode"토큰 전송이 실패했습니다.");
        ticketAmount[msg.sender] = 0;
    }

    function refund() public {
        require(!winners[msg.sender], unicode"환불받을 수 없습니다.");
        require(ticketAmount[msg.sender] == 0, unicode"구매한 티켓이 없습니다.");
        payable(msg.sender).transfer(ticketAmount[msg.sender] * presaleInfo.redemptionAmount);
        ticketAmount[msg.sender] = 0;
    }
}