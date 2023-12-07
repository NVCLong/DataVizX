import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <h2 className="mt-6 text-center text-4xl font-extrabold text-white drop-shadow-lg">
                {heading}
            </h2>

            <p className="text-center text-semibold text-2xl text-white mt-5">
            {paragraph} {' '}

            <Link to={linkUrl} className="font-bold text-neutral-300 hover:text-cyan-200 drop-shadow-lg">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
