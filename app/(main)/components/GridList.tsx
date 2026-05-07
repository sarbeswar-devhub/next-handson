import { User } from "@/types/user.type";

type props = {
    data: User[]
}

export default function GridList(props: props) {
    return (
        <>
            <div className="w-full bg-white p-3">
                <table className="table-auto w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <td className="px-2 py-1">Name</td>
                            <td className="px-2 py-1">Email</td>
                            <td className="px-2 py-1">Phone</td>
                            <td className="px-2 py-1">Status</td>
                            <td className="px-2 py-1">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.map((ele: User, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    <td className="px-2 py-1">{ele.name}</td>
                                    <td className="px-2 py-1">{ele.email}</td>
                                    <td className="px-2 py-1">{ele.phone}</td>
                                    <td className="px-2 py-1">{ele.is_active ? "Yes" : "No"}</td>
                                    <td className="px-2 py-1"></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}