import { Vehicle } from './types';

export const SEAT_MODELS: Vehicle[] = [
    {
        id: 'ibiza',
        brand: 'seat',
        name: 'Ibiza',
        category: 'Hatchback',
        price: 17890000,
        image: '/images/seat/ibiza/ibiza.webp',
        slogan: 'Creado en Barcelona',
        features: [
            {
                title: 'Seguro no. Segurísimo',
                desc: 'No te preocupes, estás cubierto. El nuevo SEAT Ibiza está equipado con innovadoras tecnologías de seguridad para que puedas concentrarte en la diversión.',
                image: '/images/seat/ibiza/caracteristicas/seguridad.jpg'
            },
            {
                title: 'Un paso adelante',
                desc: 'El nuevo SEAT Ibiza está equipado con la última tecnología para ofrecerte una forma más segura, fácil y divertida de desplazarte.',
                image: '/images/seat/ibiza/caracteristicas/teconologia.jpg'
            },
            {
                title: 'Todos mis amigos',
                desc: 'Libre, perfecto, todo es posible. Invita a tus amigos, sube el volumen de la música y sal con estilo.',
                image: '/images/seat/ibiza/caracteristicas/diseno.jpg'
            }
        ],
        gallery: [
            '/images/seat/ibiza/galeria/exterior_1.jpg',
            '/images/seat/ibiza/galeria/exterior_2.jpg',
            '/images/seat/ibiza/galeria/interior_11.jpg',
            '/images/seat/ibiza/galeria/interior_12.jpg',
            '/images/seat/ibiza/galeria/interior_4.jpg',
            '/images/seat/ibiza/galeria/interior_7.jpg'
        ],
        versions: [
            {
                name: 'STYLE 1.0 TSI MT',
                transmission: 'Mecánica',
                traction: '4x2',
                fuel: 'Gasolina',
                listPrice: 18990000,
                bonusPrice: 17890000,
                bonus: 1100000
            }
        ],
        desktopBanner: '/images/seat/ibiza/banner/banner-seat2.jpg'
    }
];
