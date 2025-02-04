export default function Footer() {
    return (
        <footer className="bg-[#00285e] text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p>
                                &copy; {new Date().getFullYear()} Federal Bureau
                                of Investigation
                            </p>
                        </div>
                        <div className="flex space-x-4"></div>
                    </div>
                </div>
            </footer>
    )
}