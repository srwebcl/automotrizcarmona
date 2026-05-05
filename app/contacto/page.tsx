// Server Component — carga datos de Car Advisor y los pasa al cliente
import { getCarAdvisorData } from '@/lib/api';
import ContactoPageClient from './ContactoPageClient';
import CarAdvisorSection from '@/components/CarAdvisorSection';

export const revalidate = 86400; // 24h — coincide con el TTL del caché en el backend

export default async function ContactoPage() {
    const carAdvisorData = await getCarAdvisorData();

    return (
        <>
            <ContactoPageClient />
            {carAdvisorData && (
                <CarAdvisorSection
                    data={carAdvisorData}
                    title="Lo que dicen nuestros clientes"
                />
            )}
        </>
    );
}
