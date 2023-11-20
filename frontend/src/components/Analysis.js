import './Analysis.css';
import { PieChart, Pie, Cell, Label,Text, Legend } from "recharts";
import { redditSentimentAnalysis, twitterSentimentAnalysis, aggregateSentimentAnalysis, sectorFormula} from "../utils/sentiment";
import { useState, useEffect } from 'react';
import { getPosts, getTweets } from '../utils/api';

/*
 * The Analysis component makes use of recharts and
 * usings the sentiment functions to populate it.
 */

const Analysis = ({maxPosts, redditOn, twitterOn, fadeStatus}) =>{

    const [combinedPosts, setCombinedPosts] = useState([]);
 
    // Uses the useEffect hook to store posts and tweets as arrays
    useEffect(() => {
        Promise.all([getPosts(), getTweets()]).then(([allPosts, allTweets]) => {
      // Combine all posts and tweets together, tagging each with their origin
        const combined = allPosts.map((post) => ({ ...post, origin: "Reddit" })).concat(allTweets.map((tweet) => ({ ...tweet, origin: "Twitter" })));
        setCombinedPosts(combined);
        });
    }, []);
 
  
     // Filter posts based on feed switcher
    const filteredPosts = combinedPosts.filter((post) => {
        if (redditOn && twitterOn) {
            return true;
        } else if (redditOn) {
            return post.origin === "Reddit";
        } else if (twitterOn) {
            return post.origin === "Twitter";
        } else {
            return false;
        }
    }).sort((a, b) => b.likes - a.likes);

    //Check to see if Twitter or Reddit Posts are displayed
    const checker = filteredPosts.slice(0, maxPosts);

    let titleTwitterCheck = false;
    let titleRedditCheck = false;

    for(const i in checker)
    {
        if (checker[i].origin == "Twitter")
        {
            titleTwitterCheck = true;
        }
        if (checker[i].origin == "Reddit")
        {
            titleRedditCheck = true;
        }
    }

    //Populates the Reddit percentages for each sector in pie chart.
    const percentageRedditLabel = ({cx,cy,midAngle,innerRadius,outerRadius,index})=>{
        let value = sectorFormula(cx,cy,midAngle,innerRadius,outerRadius);

        //A Text component is returned, using data from the Pie component when it is rendered.
        return(
            <Text 
                x={value.x} 
                y={value.y} 
                fill="white" 
                style={{fontSize: 20, fontWeight:'bolder'}} 
                textAnchor={value.x > cx ? 'start' : 'end'} 
                dominantBaseline="central">
                    {redditSentimentAnalysis(filteredPosts,maxPosts)[index].percent}
            </Text>
        );
    };

    //Populates the Twitter percentages for each sector in pie chart.
    const percentageTwitterLabel = ({cx,cy,midAngle,innerRadius,outerRadius,index,width})=>{
        let value = sectorFormula(cx,cy,midAngle,innerRadius,outerRadius);

        //A Text component is returned, using data from the Pie component when it is rendered.
        return(
            <Text 
                x={value.x} 
                y={value.y} 
                fill="white" 
                style={{fontSize: 20, fontWeight:'bolder'}} 
                textAnchor={value.x > cx ? 'start' : 'end'} 
                dominantBaseline="central">
                    {twitterSentimentAnalysis(filteredPosts,maxPosts)[index].percent}
            </Text>
        );
    };
    

    //Populates the Total percentages for each sector in pie chart.
    const percentageAggregateLabel = ({cx,cy,midAngle,innerRadius,outerRadius,index})=>{
        let value = sectorFormula(cx,cy,midAngle,innerRadius,outerRadius);
    
        return(
            <Text 
                x={value.x} 
                y={value.y} fill="white" 
                style={{fontSize: 20, fontWeight:'bolder'}} 
                textAnchor={value.x > cx ? 'start' : 'end'} 
                dominantBaseline="central">
                    {aggregateSentimentAnalysis(filteredPosts,maxPosts)[index].percent}
            </Text>
        );
    };
    
    //Three pie charts are returned for Reddit, Twitter, and Aggregate.
    return(
        <div title="sentiment-analysis-chart" className={`analysis ${fadeStatus ? 'fade-out' : 'fade-in'}`}>
            <div className="sentimentchart">
                { (redditOn || twitterOn) && (maxPosts > 0) && (<h3>Aggregate Sentiments</h3>)}
                <PieChart width={400} height={300}>
                    <Pie data={aggregateSentimentAnalysis(filteredPosts,maxPosts)} dataKey ="value" outerRadius={100} labelLine={false} label={percentageAggregateLabel} >
                    {aggregateSentimentAnalysis(filteredPosts,maxPosts).map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.colour} />
                    )}
                    </Pie>
                </PieChart>
            </div>
            <div className={"sentimentchart"}>
                { redditOn && titleRedditCheck && (<h3>Reddit Sentiments</h3>)}
                <PieChart width={400} height={300}>
                    <Pie data={redditSentimentAnalysis(filteredPosts,maxPosts)} nameKey="test" dataKey ="value" outerRadius={100} labelLine={false} label={percentageRedditLabel}>
                    {redditSentimentAnalysis(filteredPosts,maxPosts).map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.colour} />
                    )}
                    </Pie>
                </PieChart>
            </div>
            <div className="sentimentchart">
            { twitterOn && titleTwitterCheck && (<h3>Twitter Sentiments</h3>)}
                <PieChart width={400} height={300}>
                    <Legend layout="vertical" align="right" />
                    <Pie data={twitterSentimentAnalysis(filteredPosts,maxPosts)} dataKey ="value" outerRadius={100} labelLine={false} label={percentageTwitterLabel}>
                    {twitterSentimentAnalysis(filteredPosts,maxPosts).map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.colour} />
                    )}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
}

export default Analysis;
