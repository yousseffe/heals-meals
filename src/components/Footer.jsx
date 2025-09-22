function Footer() {
    return <>
    <footer className="bg-health-primary 
                        text-health-primary-foreground
                        text-xl font-regualr text-center 
                        p-4 relative bottom-0 left-0 w-full mt-2">
                            &copy; HealMeals {new Date().getFullYear()} 
                        </footer>
    </>
}

export default Footer;