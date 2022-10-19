import { useRouter } from "next/router";


export default function id(){

    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <div>ID</div>
            <div>{id}</div>
        </>
    )
}