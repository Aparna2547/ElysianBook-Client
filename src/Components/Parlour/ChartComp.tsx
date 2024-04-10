// import "./styles.css";
import React,{useEffect,useState} from "react";
import {monthlyProfit} from "../../Api/parlour"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     Revenue: 4000,
//     Profit: 2400,
//     amt: 2400
//   },
//   {
//     name: "Page B",
//     Revenue: 3000,
//     Profit: 1398,
//     amt: 2210
//   },
//   {
//     name: "Page C",
//     Revenue: 2000,
//     Profit: 9800,
//     amt: 2290
//   },
//   {
//     name: "Page D",
//     Revenue: 2780,
//     Profit: 3908,
//     amt: 2000
//   },
//   {
//     name: "Page E",
//     Revenue: 1890,
//     Profit: 4800,
//     amt: 2181
//   },
//   {
//     name: "Page F",
//     Revenue: 2390,
//     Profit: 3800,
//     amt: 2500
//   },
//   {
//     name: "Page G",
//     Revenue: 3490,
//     Profit: 4300,
//     amt: 2100
//   }
// ];
// let data = []

export default function Chart() {
    const [data,setData] = useState([])
    const [year,setYear] = useState(new Date().getFullYear())
    const [chartData, setChartData] = useState([]);

    const startYear = 2023;
    const endYear = new Date().getFullYear()+1;
    const years = Array.from({length:endYear-startYear},(_,i) =>startYear + i)

    useEffect(() => {
      const fetchData = async () => {
        const response = await monthlyProfit(year);
        console.log('fhdsjh',response.data.data)
        // const transformData = response.map((item:any) => ({
        //   name: `Month ${item.month}`,
        //   Revenue: item.totalPrice,
        //   Profit: item.totalPrice,
        //   amt: item.totalPrice,
        // }));
        setChartData(response.data.data);
      };
  
      fetchData();
   }, [year]); // Depend on year to refetch data when year changes
  

   useEffect(()=>{
    
   let months = ["Jan","Feb","Mar","Apr","May","Jun",'July',"Aug","Sep","Oct","Nov","Dec"]
   let data  = []
   let j=0
   for(let i=0;i<months.length;i++){
    console.log('sda',chartData[i]?.month,i+1)
    if( i+1 == chartData[j]?.month ){
      data.push({
        name: months[i],
    Revenue: chartData[j].totalPrice,
    Profit: 4300,
      })
      j++
    }else{
      data.push({
        name: months[i],
    Revenue: 0,
    Profit: 0,
      })
    }
   }
   console.log('data',data)
   setData(data)

   },[chartData])

   const handleDateChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setYear(e.target.value);
   };

    

  return (

    <div>
        <div className="w-2/6 flex gap-2">
          <label htmlFor="yearDropdown" className="w-2/4">Select a year:</label>
                <select id="year" className="w-2/4 text-sm" value={year} onChange={handleDateChange} >
                <option value="" className="w-full text-sm">Select Year</option>
                {years.map((year)=>(
                  <option value={year} key={year}>{year}</option>
                ))}
                </select>
        </div>
    <div>
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Revenue" fill="#8884d8" />
      <Bar dataKey="Profit" fill="#82ca9d" />
    </BarChart>
    </div>
    </div>
  );
}
