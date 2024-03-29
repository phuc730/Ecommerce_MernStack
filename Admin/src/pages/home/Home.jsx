import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { Redirect } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethod";

export default function Home({ authorize }) {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/GetUserStats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.totalAccount },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  if (!authorize) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="home">
        <FeaturedInfo />
        <Chart
          data={userStats.sort()}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    );
  }
}
