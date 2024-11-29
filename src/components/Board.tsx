import './Board.css';

const Board = () => {
  return (
    <table className='board'>
      <tr className='board-row'>
        <td className='space'>0</td>
        <td className='space'>1</td>
        <td className='space'>2</td>
      </tr>
      <tr className='board-row'>
        <td className='space'>3</td>
        <td className='space'>4</td>
        <td className='space'>5</td>
      </tr>
      <tr className='board-row'>
        <td className='space'>6</td>
        <td className='space'>7</td>
        <td className='space'>8</td>
      </tr>
    </table>
  );
};

export default Board;
