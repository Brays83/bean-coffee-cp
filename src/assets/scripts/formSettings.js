

export function saveValues() {
    const bagCoffee = document.getElementById("bag-coffee")?.value || "0";
    const anvil = document.getElementById("anvil")?.value || "0";
    const vase = document.getElementById("vase")?.value || "0";
    const fish = document.getElementById("fish")?.value || "0";

    console.log("Bolsas:", bagCoffee);
    console.log("Yunques:", anvil);
    console.log("Floreros:", vase);
    console.log("Pescados:", fish);
    
}

window.saveValues = saveValues;
