// import "./styles.css";
import React,{useEffect,useState} from "react";
import {monthlyProfit} from "../../Api/parlour"
import { PieChart, Pie } from 'recharts';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



type chartType = {
  month:number,
  totalPrice:number
}
export default function Chart() {
    // const [data,setData] = useState([])
    const [data, setData] = useState<Array<{ name: string; Revenue: number; Profit: number; }>>([]);

    const [year,setYear] = useState(new Date().getFullYear())
    const [chartData, setChartData] = useState<chartType[]>([]);

    const startYear = 2023;
    const endYear = new Date().getFullYear()+1;
    const years = Array.from({length:endYear-startYear},(_,i) =>startYear + i)

    useEffect(() => {
      const fetchData = async () => {
        const response = await monthlyProfit(year.toString());
       
        setChartData(response.data.data);
      };
  
      fetchData();
   }, [year]);
  

   useEffect(()=>{
    
   let months = ["Jan","Feb","Mar","Apr","May","Jun",'July',"Aug","Sep","Oct","Nov","Dec"]
   let data  = []
   let j=0
   for(let i=0;i<months.length;i++){
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
   setData(data)

   },[chartData])

   const handleDateChange = async (e:React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setYear(parseInt(e.target.value, 10));
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

        <div className="flex">
    <div >
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
    <div>
    <div>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
      </PieChart>
    </div>
    </div>
    </div>
    </div>
  );
}
