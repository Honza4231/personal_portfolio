const reviews = [
    { name: "Jan Novák", date: "2023-10-01", text: "Skvělý obchod s kvalitním zbožím!", stars: 5 },
    { name: "Petr Svoboda", date: "2023-10-02", text: "Rychlé dodání a fantastické produkty!", stars: 5 },
    { name: "Anna Dvořáková", date: "2023-10-03", text: "Jednoduše nejlepší fitness obchod!", stars: 5 }
];

function displayReviews() {
    const container = document.getElementById("reviews");
    container.innerHTML = "";
    reviews.forEach(r => {
        const reviewEl = document.createElement("div");
        reviewEl.className = "review mb-3";
        reviewEl.innerHTML = `
            <p><strong>${r.name}</strong> (${r.date})</p>
            <p>${r.text}</p>
            <p>${"★".repeat(r.stars)}</p>
        `;
        container.appendChild(reviewEl);
    });
}

document.getElementById("toggleReviewForm").addEventListener("click", () => {
    const form = document.getElementById("reviewForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
});

document.getElementById("submitReview").addEventListener("click", () => {
    const nameInput = document.getElementById("reviewName");
    const starsInput = document.getElementById("reviewStars");
    const textInput = document.getElementById("reviewInput");
    if (textInput.value.trim()) {
        const date = new Date().toISOString().split('T')[0];
        reviews.push({ name: nameInput.value.trim(), date: date, text: textInput.value.trim(), stars: parseInt(starsInput.value) });
        displayReviews();
        textInput.value = "";
        nameInput.value = "";
        starsInput.value = "5";
    }
});

displayReviews();