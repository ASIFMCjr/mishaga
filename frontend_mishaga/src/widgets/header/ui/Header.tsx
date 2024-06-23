import { Link } from "@tanstack/react-router"
import examplePhoto from 'assets/examplePhoto.jpeg'
export const Header = () => {
    return (
        <div className="header self-start w-10/12 m-auto h-20 flex flex-row justify-between items-center px-4 border-b border-semiLightGray">
            <div className="w-1/5">
                <Link className="bg-yellow block p-2 max-w-36 w-full text-black" to="/topics">
                    <h1 className="lg:text-xl 
                                    md:text-lg
                                    text-sm"><b>МЫЩ</b>ага</h1>
                </Link>
            </div>
            <div className="w-3/5 flex flex-row justify-center">
                <Link className="ml-8 text-gray hover:text-black transition-colors" to="/topics">Главная</Link>
                <Link className="ml-8 text-gray hover:text-black transition-colors" to="/advertisments">Объявления</Link>
                <Link className="ml-8 text-gray hover:text-black transition-colors" to="/events">Мероприятия</Link>
            </div>
            <div className="w-1/5 flex flex-row justify-end">
                <Link to="/profile"><img src={examplePhoto} className="rounded-full w-12 h-12 object-cover text-center" width={48} height={48}/></Link>
            </div>
        </div>
    )
}