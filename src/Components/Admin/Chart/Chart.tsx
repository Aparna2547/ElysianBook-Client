import {AreaChart,XAxis,YAxis,CartesianGrid,Tooltip,Area} from "recharts"

const ChartComponent = () => {
    const data = [
        {
            "month": "Jan",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Feb",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Mar",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Apr",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "May",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Jun",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Jul",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Aug",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Sep",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Oct",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Nov",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        },
        {
            "month": "Dec",
            "Registering revenue": 0,
            "Booking Revenue": 0,
        }
    ]

    
 return (
    <AreaChart width={730} height={250} data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
 )
};

export default ChartComponent;
