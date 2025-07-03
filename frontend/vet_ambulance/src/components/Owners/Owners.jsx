import { useEffect, useState } from "react";
import { getOwners } from "../../services/ownersService";

const Owners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOwners();
        setOwners(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log(owners);

  return <h1>Owners</h1>;
};

export default Owners;
