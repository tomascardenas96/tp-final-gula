function useGetUsersAndShopsByQuery({ shop }) {
  const token = localStorage.getItem("accessToken");
  const [shops, setShops] = useState([]);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [shopsError, setShopsError] = useState(false);

  useEffect(() => {
    async function getShopsByQuery() {
      try {
        setShopsLoading(true);
        const response = await fetch(
          `http://localhost:3070/shop/filter?shop=${shop}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setShops(data);
      } catch (err) {
        setShopsError("Error trying to get list of shops", err);
      } finally {
        setShopsLoading(false);
      }
    }

    getShopsByQuery();
  }, [token]);

  return { shops, shopsLoading, shopsError };
}

export default useGetUsersAndShopsByQuery;
