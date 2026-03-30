const getData = () => {
    const title = document.querySelector("h1")?.innerText || "";

    // ✅ IMÁGENES (más preciso)
    const images = Array.from(document.querySelectorAll("img"))
        .map(img => img.src)
        .filter(src =>
            src &&
            src.includes("Q5") &&
            src.includes("2024") &&
            !src.includes("logo")
        );

    // ✅ FEATURES (MUCHO MÁS CONTROLADO)
    const features = Array.from(document.querySelectorAll("section"))
        .map(section => {
            const title = section.querySelector("h2, h3")?.innerText;
            const description = section.querySelector("p")?.innerText;

            return { title, description };
        })
        .filter(f => {
            if (!f.title || !f.description) return false;

            const text = (f.title + f.description).toLowerCase();

            // ❌ eliminar basura
            if (
                text.includes("cookie") ||
                text.includes("consentimiento") ||
                text.includes("privacidad")
            ) return false;

            // ❌ eliminar números sueltos
            if (/^\d+$/.test(f.title)) return false;

            // ❌ eliminar textos cortos basura
            if (f.title.length < 5 || f.description.length < 20) return false;

            return true;
        });

    return { title, images, features };
};

copy(getData());
console.log("✅ DATA LIMPIA");