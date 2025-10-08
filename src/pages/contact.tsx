import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Seo from '../components/Seo';
import Text from "@/components/custom-ui/text";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    MessageCircle
} from "lucide-react";

const contactInfo = [
    {
        icon: <Mail className="h-6 w-6" />,
        title: "Email",
        content: "gechdejenb@gmail.com",
        description: "We'll respond as soon as possible"
    },
    {
        icon: <Phone className="h-6 w-6" />,
        title: "Phone",
        content: "+251922756268",
        description: "Mon-Fri from 8am to 6pm"
    }
];

export default function contact() {
    const handleEmailClick = () => {
        window.location.href = "mailto:gechdejenb@gmail.com";
    };

    const handlePhoneClick = () => {
        window.location.href = "tel:+251922756268";
    };

    return (
        <>
            <Seo 
                title="Contact Us | ChatToDocs" 
                description="Get in touch with our team. We're here to help you succeed with ChatToDocs." 
            />
            
            <div className="min-h-screen bg-background">
                {/* Header */}
                <section className="pt-20 pb-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Text 
                                    label="Contact" 
                                    className="text-4xl md:text-5xl font-bold text-primary mb-6" 
                                />
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    Get in Touch
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Have questions? Reach out directly via email or phone. We're here to help.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Contact Grid */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Direct Contact Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-card p-8 rounded-lg shadow-sm"
                                >
                                    <h2 className="text-2xl font-bold text-foreground mb-6">
                                        Contact Directly
                                    </h2>
                                    <div className="space-y-6">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button 
                                                onClick={handleEmailClick}
                                                className="w-full h-16 bg-primary hover:bg-primary/90 text-lg"
                                            >
                                                <Mail className="mr-3 h-5 w-5" />
                                                Email Us
                                            </Button>
                                        </motion.div>
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button 
                                                onClick={handlePhoneClick}
                                                variant="outline"
                                                className="w-full h-16 text-lg border-primary text-primary hover:bg-primary/10"
                                            >
                                                <Phone className="mr-3 h-5 w-5" />
                                                Call Us
                                            </Button>
                                        </motion.div>

                                        {/* Quick Info */}
                                        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <MessageCircle className="h-4 w-4" />
                                                <p>We typically respond within 24 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Contact Information */}
                                <div className="space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-card p-8 rounded-lg shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-foreground mb-6">
                                            Contact Information
                                        </h2>
                                        <div className="space-y-6">
                                            {contactInfo.map((info, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    className="flex items-start gap-4"
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                                                        {info.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">
                                                            {info.title}
                                                        </h3>
                                                        <p className="text-muted-foreground font-medium">
                                                            {info.content}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {info.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Social Links */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="bg-card p-8 rounded-lg shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-foreground mb-6">
                                            Follow Us
                                        </h2>
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="flex-1">
                                                Twitter
                                            </Button>
                                            <Button variant="outline" className="flex-1">
                                                LinkedIn
                                            </Button>
                                            <Button variant="outline" className="flex-1">
                                                GitHub
                                            </Button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}