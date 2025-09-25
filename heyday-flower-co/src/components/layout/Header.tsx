import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    Heyday Flower Co
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-white hover:underline">About</Link>
                        </li>
                        <li>
                            <Link href="/shop" className="text-white hover:underline">Shop</Link>
                        </li>
                        <li>
                            <Link href="/cart" className="text-white hover:underline">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;