import React from 'react';

function LoadingPlaceholder() {
	return (
		<>
			{[1, 2, 3, 4].map((i) => (
				<div
					key={i}
					className='border border-indigo-300 shadow rounded-md p-4 max-w-sm w-full mx-auto'
				>
					<div className='animate-pulse flex space-x-4 flex-col'>
						<div className='rounded-lg bg-slate-200 h-10 w-full mx-auto mb-4'></div>
						<div className='flex-1 space-y-6 py-1'>
							<div className='h-2 bg-slate-200 rounded'></div>
							<div className='space-y-3'>
								<div className='grid grid-cols-3 gap-4'>
									<div className='h-2 bg-slate-200 rounded col-span-2'></div>
									<div className='h-2 bg-slate-200 rounded col-span-1'></div>
								</div>
								<div className='h-2 bg-slate-200 rounded'></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
		// <div className='mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
		// </div>
	);
}

export default LoadingPlaceholder;
