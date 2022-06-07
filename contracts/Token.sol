import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

contract Token is ERC20 { // объявление контракта
    address public minter; // добавление переменной minter(майнер)

    constructor() public ERC20("DzmitryRubashkaToken", "DRT") {
        _mint(msg.sender, 10000 * 10 ** 18);
        minter = msg.sender; // назначаем первоначального майнера
    }

    function mint(address to, uint amount) external {
        require(msg.sender==minter, 'Error, only minter can do it!');
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }
}