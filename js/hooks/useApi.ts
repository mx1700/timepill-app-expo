import * as React from "react";

type PromiseFunction<R> = (...args: any[]) => Promise<R>;


function usePromise<F extends (...args: any[]) => Promise<any>>(fn: F, ...args: Parameters<F>):
  [boolean, string | null, ReturnType<F> extends Promise<infer R> ? R : never | null] {

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const f = async () => {
      try {
        const r = await fn(...args)
        setData(r)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }
    f();
  }, [fn, ...args]);

  return [loading, error, data]
}

export const useApi = usePromise
export default useApi

// export default function useApi1<T>(call: any, ...args: any[]): any {
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(false);
//   const [data, setData] = React.useState(null);
//
//   React.useEffect(() => {
//     const f = async () => {
//       try {
//         const r = await call(...args)
//         setData(r)
//       } catch (e) {
//         setError(e)
//       }
//       setLoading(false)
//     }
//     f();
//   }, [call, ...args]);
//
//   return [loading, error, data]
// }

