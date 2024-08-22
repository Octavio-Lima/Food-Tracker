def currency_to_float(value: str):
    return float(
        value.replace(".", "").replace(",", ".").replace("R$", "").strip() or 0
    )
