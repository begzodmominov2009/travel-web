  const base_url = process.env.NEXT_PUBLIC_URL;

  const getData = async ({ url }: { url: string }) => {
    const res = await fetch(`${base_url}/${url}`, {
      next:{
          revalidate: 40
      }
    });
    const data = await res.json();

    return data ;
  };

  export default getData;
