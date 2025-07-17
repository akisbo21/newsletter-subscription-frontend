import NewsletterForm from "../components/NewsletterForm";
import NewsletterSubscribersList from "../components/NewsletterSubscribersList";

export default function NewsletterSubscription() {
    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-2/3 lg:mt-0 mt-4">
                    <NewsletterForm />
                </div>
                <div className="lg:w-1/3 lg:mt-0 mt-8 flex justify-center">
                    <div className="w-full max-w-md">
                        <NewsletterSubscribersList />
                    </div>
                </div>
            </div>
        </div>
    );
}
