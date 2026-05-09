// Test sitesi için JavaScript fonksiyonları

let clickCount = 0;

function testFunction() {
    clickCount++;
    const output = document.getElementById('output');
    output.innerText = `Test başarılı! Butona ${clickCount} kez tıkladınız.`;
    output.classList.add('show');

    // Ek animasyon efekti
    output.style.transform = 'scale(1.1)';
    setTimeout(() => {
        output.style.transform = 'scale(1)';
    }, 200);
}

async function validateForm(event) {
    event.preventDefault(); // Formun normal gönderimini engelle

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const result = document.getElementById('formResult');

    if (name.trim() === '' || email.trim() === '') {
        result.innerText = 'Lütfen tüm alanları doldurun!';
        result.style.color = '#ff6b6b';
        result.classList.add('show');
        return;
    }

    if (!email.includes('@')) {
        result.innerText = 'Geçerli bir e-posta adresi girin!';
        result.style.color = '#ff6b6b';
        result.classList.add('show');
        return;
    }

    try {
        // Server'a POST isteği gönder
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        const data = await response.json();

        if (response.ok) {
            result.innerText = `Merhaba ${name}! Verileriniz kaydedildi.`;
            result.style.color = '#4CAF50';
            result.classList.add('show');

            // Listeyi güncelle
            loadDataFromServer();
        } else {
            result.innerText = data.error || 'Bir hata oluştu.';
            result.style.color = '#ff6b6b';
            result.classList.add('show');
        }
    } catch (error) {
        console.error('Hata:', error);
        result.innerText = 'Sunucuya bağlanılamadı.';
        result.style.color = '#ff6b6b';
        result.classList.add('show');
    }

    // Formu temizle
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

async function loadDataFromServer() {
    try {
        const response = await fetch('/api/veriler');
        const data = await response.text();
        document.getElementById('userList').innerText = data;
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        document.getElementById('userList').innerText = 'Veriler yüklenemedi.';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log('Test sitesi yüklendi!');

    // Form submit event listener
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', validateForm);
    }

    // Kayıtlı verileri server'dan yükle
    loadDataFromServer();
});