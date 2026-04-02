// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 安全开源ERC-20代币合约
contract SafeERC20 {
    string public constant name = "Blockchain Pro Token";
    string public constant symbol = "BPT";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    address public immutable owner;

    constructor() {
        owner = msg.sender;
        totalSupply = 100000000 * 10 ** decimals;
        balances[owner] = totalSupply;
    }

    // 转账
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }

    // 授权
    function approve(address spender, uint256 amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        return true;
    }
}
