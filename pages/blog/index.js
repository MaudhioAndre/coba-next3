import { useState, useEffect } from "react";

import styles from "./blog.module.scss";

const Blog = (props) =>{
  const [user, setUser] = useState(props.user || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.NEXT_PUBLIC_API);
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/getdatablog`);
      const users = await data.json();
      const ea = await users.blog;
      console.log(ea);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);


    useEffect(()=> {
        setLoading(true)
    }, [props.user]);

    useEffect(()=> {
        setLoading(false)
    }, [props.user]);

  return (
    <>
      <div className={styles.div}>BLOG</div>
      {loading ? (
        <div>LOADING...</div>
      ) : user && user.map((data, index) => (
        <>
            <div key={data.id}>{data.title}</div>
        </>
      ))}
    </>
  );
};

export default Blog;

export async function getServerSideProps(context) {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const users = await data.json();
    return { props: { user: users } };

    // await axios
    //   .get(`http://localhost/yarnapi/getdatablog`)
    //   .then((response) => {
    //     console.log(response);
    //     // setblog(response.data.blog);
    //     const ea = response.data.blog;
    //     return { props: { user: ea } };
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });

  } catch (err) {
    return { props: { user: [] } };
  }
}
