const blogs = [
	{
		id: "1",
		author: "Mark",
		content: "blog 1 content is here",
	},
	{
		id: "2",
		author: "Mohamed",
		content: "blog 2 content is here",
	},
	{
		id: "3",
		author: "Amine",
		content: "blog 3 content is here",
	},
];

// 블로그 데이터 타입 정의
interface Blog {
	id: string;
	author: string;
	content: string;
}

// 실제 서버 데이터를 가져오는 예시 함수
async function fetchServerBlogs(): Promise<Blog[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
	if (!response.ok) {
		throw new Error("Failed to fetch blogs from the server");
	}
	return response.json();
}

export async function GET(): Promise<Response> {
	// 환경변수에 따라 분기 처리
	if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
		// 개발 환경에서는 mock 데이터 사용
		return new Response(JSON.stringify(blogs), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		// 프로덕션 환경에서는 실제 서버 데이터 사용
		try {
			const data = await fetchServerBlogs();
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} catch (error: unknown) {
			// error가 Error 인지 확인 후 처리
			if (error instanceof Error) {
				return new Response(JSON.stringify({ error: error.message }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}
			return new Response(
				JSON.stringify({ error: "An unknown error occurred" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	}
}
