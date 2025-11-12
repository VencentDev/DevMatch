"use client"

import type React from "react"

import { Linkedin, Instagram, Twitter, Mail, ArrowRight } from "lucide-react"

export default function Footer(): React.ReactElement {
	const currentYear = new Date().getFullYear()

	const productLinks = [
		{ label: "For Freelancers", href: "#" },
		{ label: "For Clients", href: "#" },
		{ label: "Pricing", href: "#" },
		{ label: "How It Works", href: "#" },
	]

	const companyLinks = [
		{ label: "About Us", href: "#" },
		{ label: "Blog", href: "#" },
		{ label: "Careers", href: "#" },
		{ label: "Documentation", href: "#" },
	]

	const supportLinks = [
		{ label: "Help Center", href: "#" },
		{ label: "Contact Support", href: "#" },
		{ label: "Community", href: "#" },
		{ label: "Status Page", href: "#" },
	]

	const socialLinks = [
		{ icon: Linkedin, label: "LinkedIn", href: "#" },
		{ icon: Instagram, label: "Instagram", href: "#" },
		{ icon: Twitter, label: "Twitter", href: "#" },
		{ icon: Mail, label: "Email", href: "#" },
	]

	return (
		<footer className="relative bg-black text-white">
			{/* linear overlay at top */}
			<div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-violet-900/20 to-transparent pointer-events-none" />

			{/* Main footer content */}
			<div className="relative pt-24 pb-12 px-8 max-w-7xl mx-auto">
				{/* Top section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Brand section */}
					<div className="lg:col-span-1">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center font-bold text-white">
								DM
							</div>
							<span className="text-xl font-semibold">DevMatch</span>
						</div>
						<p className="text-gray-400 text-sm leading-relaxed mb-8">
							Connect with top freelancers and clients. Build amazing projects
							together with DevMatch.
						</p>

						{/* CTA Buttons */}
						<div className="flex gap-3 mb-8">
							<button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">
								Get Started
								<ArrowRight size={18} />
							</button>
							<button className="border border-white/20 hover:border-white/40 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
								Learn More
							</button>
						</div>

						{/* Social links */}
						<div className="flex gap-4">
							{socialLinks.map((social) => {
								const Icon = social.icon
								return (
									<a
										key={social.label}
										href={social.href}
										aria-label={social.label}
										className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-violet-600 hover:border-violet-600 transition-all duration-300"
									>
										<Icon size={20} />
									</a>
								)
							})}
						</div>
					</div>

					{/* Product links */}
					<div>
						<h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
							Product
						</h3>
						<ul className="space-y-3">
							{productLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company links */}
					<div>
						<h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
							Company
						</h3>
						<ul className="space-y-3">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Support links */}
					<div>
						<h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
							Support
						</h3>
						<ul className="space-y-3">
							{supportLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-white/10 my-8" />

				{/* Bottom section */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex flex-col md:flex-row gap-6 text-sm text-gray-400">
						<a
							href="#"
							className="hover:text-violet-400 transition-colors"
						>
							Terms & Conditions
						</a>
						<a
							href="#"
							className="hover:text-violet-400 transition-colors"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="hover:text-violet-400 transition-colors"
						>
							Cookie Policy
						</a>
					</div>
					<p className="text-sm text-gray-400">
						Copyright © {currentYear} DevMatch. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
