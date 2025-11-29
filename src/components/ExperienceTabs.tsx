import { useState } from "preact/hooks";

interface Experience {
	company: string;
	role: string;
	period: string;
	description: string[];
}

interface ExperienceTabsProps {
	experiences: Experience[];
}

export default function ExperienceTabs({ experiences }: ExperienceTabsProps) {
	const [activeTab, setActiveTab] = useState(experiences[0].company);

	const activeExperience = experiences.find((exp) => exp.company === activeTab);
	const activeIndex = experiences.findIndex((exp) => exp.company === activeTab);

	return (
		<div class="flex flex-col lg:flex-row gap-8">
			{/* Tabs */}
			<div class="flex flex-row lg:flex-col relative overflow-x-auto lg:overflow-x-visible scrollbar-thin">
				
				{/* Animated border indicator */}
				<div
					class="absolute left-0 w-0.5 h-12 bg-accent transition-all duration-300 ease-out hidden lg:block"
					style={{
						transform: `translateY(${activeIndex * 48}px)`
					}}
				/>
				<div
					class="absolute bottom-0 left-0 h-0.5 w-32 bg-accent transition-all duration-300 ease-out lg:hidden"
					style={{
						transform: `translateX(${activeIndex * 128}px)`
					}}
				/>
				
				{experiences.map((exp) => (
					<button
						key={exp.company}
						onClick={() => setActiveTab(exp.company)}
						class={`w-32 shrink-0 text-center lg:w-auto px-4 py-3 lg:text-left transition-all duration-300 hover:bg-accent/10 hover:cursor-pointer hover:text-accent border-b-2 lg:border-l-2 lg:border-b-0 border-muted ${
							activeTab === exp.company
								? "text-accent bg-accent/10"
								: "text-muted"
						}`}
					>
						{exp.company}
					</button>
				))}
			</div>

			{/* Content */}
			<div class="flex-1 h-80">
				{activeExperience && (
					<div class="animate-fadeIn">
						<h4 class="text-2xl font-bold text-text mb-1">
							{activeExperience.role}
						</h4>
						<h5 class="text-lg font-semibold text-accent mb-2">
							{activeExperience.company}
						</h5>
						<p class="text-sm text-muted mb-6">
							{activeExperience.period}
						</p>
						<ul class="space-y-3">
							{activeExperience.description.map((item) => (
								<li class={`flex gap-3 items-center text-muted text-sm`}>
									<span class="text-accent mt-1">▹</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
