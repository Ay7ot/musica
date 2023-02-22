import { releases } from "./HomebodyInfo";

function HomeReleases() {
    return (  
        <section className="box-content">
                <h2 className='text-gray-dark font-bold text-[1.2rem] mt-10 lg:text-[1.5rem]'>New Releases</h2>
                <div className="overflow-x-scroll no-scrollbar grid grid-cols-7 gap-[170px] sm:gap-[180px] md:gap-[200px] lg:gap-[220px] xl:gap-[250px] 2xl:gap-[10%] mt-4 box-content">
                    {releases.map(release=>{
                        return (
                            <div className="w-[150px] lg:w-[200px]" key={release.id}>
                                <img src={release.releaseImg} className='rounded-xl w-full'/>
                                <p className="text-white font-bold mt-2 tracking-wide">{release.releaseTitle}</p>
                                <p className="text-gray-dark text-sm">{release.releaseArtist}</p>
                            </div>
                        )
                    })}
                </div>
        </section>
    );
}

export default HomeReleases;