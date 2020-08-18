import * as React from "react";

export default function useApi(call, ...args) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const f = async () => {
      try {
        const r = await call(...args)
        setData(r)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    f();
  }, [call, ...args]);

  return [loading, error, data]
}