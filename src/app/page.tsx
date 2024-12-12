"use client";
import React, { useEffect, useState } from "react";

// 블로그 데이터의 타입 정의
interface Blog {
	id: string;
	author: string;
	content: string;
}

export default function Home() {
	const [blogs, setBlogs] = useState<Blog[]>([]); // 블로그 데이터 상태의 타입 지정
	const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 타입 지정
	const [error, setError] = useState<string | null>(null); // 에러 상태 타입 지정

	useEffect(() => {
		// Fetching the blogs data from the API
		const fetchBlogs = async () => {
			try {
				const response = await fetch(`/api/blogs`);
				if (!response.ok) {
					throw new Error("Failed to fetch blogs");
				}
				const data: Blog[] = await response.json(); // 반환된 데이터 타입 지정
				setBlogs(data); // Store the fetched data in state
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(error.message); // Handle any errors
			} finally {
				setLoading(false); // Stop loading once the request is complete
			}
		};

		fetchBlogs();
	}, []); // Empty dependency array means this effect runs only once after the first render

	// Display loading or error messages if needed
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="bg-slate-600 p-5">
			<h1 className="text-white text-3xl">Blog Posts</h1>
			<div className="mt-5">
				{blogs.length === 0 ? (
					<p>No blogs available</p>
				) : (
					<ul className="space-y-4">
						{blogs.map((blog) => (
							<li
								key={blog.id}
								className="bg-white text-black p-4 rounded-lg shadow-md"
							>
								<h2 className="text-xl font-semibold">{blog.author}</h2>
								<p>{blog.content}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
