import ResearchTextComponent from '@/sections/research_text_component';
// import MarketSizeCharts from '@/charts/three_cols_charts';


function MarketSizeSection({contentSection}){

    return(
        <section className="section has-background-white">
            <div className="container is-fluid no-padding">
                <ResearchTextComponent title="Market Size" text_content={contentSection.content}/>
            </div>
        </section>


    )
}

export default MarketSizeSection;