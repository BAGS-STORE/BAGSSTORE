// ===== Pricing Settings =====
const EXCHANGE_RATE = 413;   // سعر الصرف (غيره متى ما تريد)
const EXTRA_AMOUNT  = 3000;  // مبلغ ثابت يضاف على كل منتج

function calculateFinalPrice(priceSAR) {
    return (priceSAR * EXCHANGE_RATE) + EXTRA_AMOUNT;
}


// Configuration for each category
const categories = [
    {
        id: "women",
        containerId: "womenProducts",
        folderPath: "images/women/",
        prefix: "",
        startNum: 1,
        endNum: 89,
        prices: [21, 28, 8, 22, 23,13,14,8,
                 23, 21, 18,21,  8,28,18,25,
                 14,  8, 10,   21,  5,    21, 8, 15,
                 26,  25,15,   15.5, 25,  7,  11, 23 
                ,21,  16,21,    19,  8,   21,  8,  8
                ,20,  18,22,     7,  15,   7,  15, 28,
                14,   28,18,     19, 10,   19, 19, 25,
               
                15,   15,25,     15, 21,   16, 11,  25,//OK
                11,   19,15,     20,  19,   13, 23,   11,       
                21,   21,18,     19,   8,   28,  8  , 23 ,
                21   ,8  ,7     ,8     ,7 ,  6,  6,   6 ,
                26    //TO IMAGE =89
            ], // الأسعار بالريال السعودي
        defaultPrice: 20,
        title: "حقيبة نسائية"
    },
    {
        id: "school",
        containerId: "schoolProducts",
        folderPath: "images/school/",
        prefix: "",
        startNum: 1,
        endNum: 56,
        prices: [23,21,18,29,
                 22,22, 22,22,
                 21,11,21,21,
                 11,11,41,23,
                21, 11,21, 21,
                25, 11, 21, 21, //24
                21 ,13, 19, 23, 
                19, 41, 24 , 15, 
                26,  15, 14.5,23,
                 25, 17, 24,  ,22,
                 14.5,16.5,29, 25,//44
                  26, 16.5,14.5,21,
                  29, 13,2  ,25, 13,
                  19, 26,    25,11   //56

                   ],
        defaultPrice: 20,
        title: "حقيبة مدرسية"
    },
    {
        id: "formal",
        containerId: "formalProducts",
        folderPath: "images/formal/",
        prefix: "",
        startNum: 1,
        endNum: 5,
        prices: [],
        defaultPrice: 20,
        title: "حقيبة رسمية"
    },
    {
        id: "travel",
        containerId: "travelProducts",
        folderPath: "images/travel/",
        prefix: "",
        startNum: 1,
        endNum: 5,
        prices: [18, 18],
        defaultPrice: 18,
        title: "حقيبة سفر"
    }
];


// Main function to render products
function renderProducts(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    for (let i = config.startNum; i <= config.endNum; i++) {

        // السعر الأساسي بالريال السعودي
        let priceSAR = config.prices[i - 1] !== undefined 
            ? config.prices[i - 1] 
            : config.defaultPrice;

        // السعر النهائي بعد التحويل والزيادة
        let finalPrice = calculateFinalPrice(priceSAR);

        let imgSrc = `${config.folderPath}${config.prefix}${i}.jpg`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${imgSrc}" alt="${config.title} ${i}" class="product-image"
            onerror="this.src='https://via.placeholder.com/300?text=No+Image'">

            <div class="product-info">
                <h3 class="product-title">${config.title} - ${i}</h3>
                <p class="product-price">${finalPrice.toLocaleString()} ريال</p>
                <button class="btn-view"
                    onclick="openModal('${config.title} - ${i}', '${finalPrice}', '${imgSrc}')">
                    عرض التفاصيل
                </button>
            </div>
        `;

        container.appendChild(card);
    }
}


// Render all categories
document.addEventListener('DOMContentLoaded', () => {
    categories.forEach(cat => renderProducts(cat));
});


// Modal Logic
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const modalTelegram = document.getElementById('modalTelegram');
const closeModal = document.querySelector('.close-modal');

function openModal(title, price, imageSrc) {

    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalPrice.textContent = `${Number(price).toLocaleString()} ريال`;

    const phoneNumber = "967730651230";
    const telegramUser = "730651230";

    const fullImgUrl = new URL(imageSrc, document.baseURI).href;

    const messageText =
`مرحباً 👋
أرغب بطلب المنتج التالي:

👜 المنتج: ${title}
💰 السعر: ${Number(price).toLocaleString()} ريال

📷 رابط الصورة:
${fullImgUrl}

بانتظار تأكيدكم 🌸`;

    const message = encodeURIComponent(messageText);

    modalWhatsapp.href = `https://wa.me/${phoneNumber}?text=${message}`;
    modalTelegram.href = `https://t.me/${telegramUser}`;
}


// Close modal
closeModal.onclick = () => {
    modal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
