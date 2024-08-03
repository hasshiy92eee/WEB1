// src/api.ts
export async function fetchData(): Promise<{ message: string }> {
    const response = await fetch('http://localhost:3000/api/data');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
