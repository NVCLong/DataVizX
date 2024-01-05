import { elements } from "chart.js";

const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
];

function Table({ chartData }) {
  const labels = chartData.labels;
  const datas = chartData.datasets[0].data;


  return (
    <div className="Table">
      <table>
        <tr>
          <th>Lables</th>
          {labels.map((val)=>{
            return(
                <th>{val}</th>  
            )
          })}
        </tr>
        <tr>
        <td>Values</td>
        {datas.map((val)=>{
            return(
                <td>{val}</td>  
            )
          })}
        </tr>

      </table>
    </div>
  );
}

export default Table;
