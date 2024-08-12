import Link from 'next/link';
import AssignForm from './AssignForm';

const UserAssign = () => {
    return (
        <div>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>User</span>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Assign</span>
                    </li>
                </ul>
            </div>
            <div className="my-5">
                <div>
                    <AssignForm />
                </div>
            </div>
        </div>
    );
};

export default UserAssign;
