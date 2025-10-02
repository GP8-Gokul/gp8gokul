export default function Footer() {
    return(
        <footer className="mt-10 py-6 border-t border-gray-200 relative z-10 bg-white/50">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm font-medium">
                <p>© {new Date().getFullYear()} Gokul P Jayan.</p>
            </div>
        </footer>
    )
}