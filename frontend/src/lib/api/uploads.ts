const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PresignResponse {
    uploadUrl: string;
    publicUrl: string;
}

async function getPresignedUrl(file: File): Promise<PresignResponse> {
    const res = await fetch(`${API_URL}/uploads/presign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });
    if (!res.ok) throw new Error(`Failed to get upload URL (${res.status})`);
    return res.json();
}

export async function uploadFile(file: File): Promise<string> {
    const { uploadUrl, publicUrl } = await getPresignedUrl(file);

    const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
    });

    if (!putRes.ok) throw new Error(`Upload to storage failed (${putRes.status})`);

    return publicUrl;
}