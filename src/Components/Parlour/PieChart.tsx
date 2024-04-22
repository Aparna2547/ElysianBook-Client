// import React,{useState,useEffect} from 'react';
// import { PieChart, Pie } from 'recharts';
// import {monthlyProfit} from "../../Api/parlour"
// // const data = [
// //   { name: 'Group A', value: 400 },
// //   { name: 'Group B', value: 300 },
// //   { name: 'Group C', value: 300 },
// //   { name: 'Group D', value: 200 },
// // ];

// const PieChartComponent = () => {
//   const [data,setData] = useState([])
//   useEffect(()=>{
//     const fetchData = async () =>{
//       const res = await monthlyProfit(year)
//       console.log('er',res)
//     }
//     fetchData();

//   },[])


//   return (
//     <div>
//       <PieChart width={400} height={400}>
//         <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
//       </PieChart>
//     </div>
//   );
// };

// export default PieChartComponent;
