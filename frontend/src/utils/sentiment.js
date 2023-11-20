import Sentiment from "sentiment";

//Sentiment scores calculated for Reddit
export function redditSentimentAnalysis(filteredScores,maxPosts)
{
    if(typeof(filteredScores) == 'undefined')
    {
        return filteredScores = [];
    }
    let filterredditPositiveScore = 0;
    let filterredditNegativeScore = 0;
    let filterredditNeutralScore = 0;
    let filtertotalScore = 0;

    const SentimentAnalyzer = new Sentiment();

    let filterRedditSentiments = filteredScores.slice(0,maxPosts).map(score=>{
        if(score.origin == "Reddit")
        {
           
            return SentimentAnalyzer.analyze(score.title).score;
            
        }
    })

    for (const i of filterRedditSentiments)
    {
        if(typeof(i) != 'undefined')
        {
            filtertotalScore++;
        }
        if(i > 0)
        {
            filterredditPositiveScore++;
        }
        if(i < 0)
        {
            filterredditNegativeScore++;
        }
        if(i == 0)
        {
            filterredditNeutralScore++;
        }
    }

    let positivePercent = Math.trunc((filterredditPositiveScore/filtertotalScore)*100);
    let negativePercent = Math.trunc((filterredditNegativeScore/filtertotalScore)*100);
    let neutralPercent = Math.trunc((filterredditNeutralScore/filtertotalScore)*100);

    let filterredditSentimentChartScores = [
        {name: 'positive', value: filterredditPositiveScore, colour: "#00bd00", percent: positivePercent+"%"},
        {name: 'negative', value: filterredditNegativeScore, colour: "red", percent: negativePercent+"%"},
        {name: 'neutral', value: filterredditNeutralScore, colour: "orange", percent: neutralPercent+"%"}
    ]

    return filterredditSentimentChartScores;
}

//Sentiment Scores calculated for Twitter
export function twitterSentimentAnalysis(filteredScores,maxPosts)
{
    if(typeof(filteredScores) == 'undefined')
    {
        return filteredScores = [];
    }
    let filtertotalScore = 0;
    let filtertwitterPositiveScore = 0;
    let filtertwitterNegativeScore = 0;
    let filtertwitterNeutralScore = 0;

    const SentimentAnalyzer = new Sentiment();

    let filterTwitterSentiments = filteredScores.slice(0,maxPosts).map(score=>{
        if(score.origin == "Twitter")
        {
            return SentimentAnalyzer.analyze(score.title).score;
        }
    })


    for (const i of filterTwitterSentiments)
    {
        if(typeof(i) != 'undefined')
        {
            filtertotalScore++;
        }

        if(i > 0)
        {
            filtertwitterPositiveScore++;
        }
        if(i < 0)
        {
            filtertwitterNegativeScore++;
        }
        if(i == 0)
        {
            filtertwitterNeutralScore++;
            
        }
    }

    let positivePercent = Math.trunc((filtertwitterPositiveScore/filtertotalScore)*100);
    let negativePercent = Math.trunc((filtertwitterNegativeScore/filtertotalScore)*100);
    let neutralPercent = Math.trunc((filtertwitterNeutralScore/filtertotalScore)*100);

    let filtertwitterSentimentChartScores = [
        {name: 'positive', value: filtertwitterPositiveScore, colour: "#00bd00", percent: positivePercent+"%"},
        {name: 'negative', value: filtertwitterNegativeScore, colour: "red", percent: negativePercent+"%"},
        {name: 'neutral', value: filtertwitterNeutralScore, colour: "orange", percent: neutralPercent+"%"}
    ]
    
    return filtertwitterSentimentChartScores;
}

//Sentiment scores from both Reddit and Twitter
export function aggregateSentimentAnalysis(filteredScores)
{
    let redditScores = redditSentimentAnalysis(filteredScores);
    let twitterScores = twitterSentimentAnalysis(filteredScores);

    let positiveScore = 0;
    let negativeScore = 0;
    let neutralScore = 0;
    let totalScore = 0;

    for (const i of redditScores)
    {
        if(i.name == "positive")
        {
            positiveScore = positiveScore + i.value;
            totalScore = totalScore + i.value;
        }
        if(i.name == "negative")
        {
            negativeScore = negativeScore + i.value;
            totalScore = totalScore + i.value;
        }
        if(i.name == "neutral")
        {
            neutralScore = neutralScore + i.value;
            totalScore = totalScore + i.value;
        }
    }

    for (const i of twitterScores)
    {
        if(i.name == "positive")
        {
            positiveScore = positiveScore + i.value;
            totalScore = totalScore + i.value;
        }
        if(i.name == "negative")
        {
            negativeScore = negativeScore + i.value;
            totalScore = totalScore + i.value;
        }
        if(i.name == "neutral")
        {
            neutralScore = neutralScore + i.value;
            totalScore = totalScore + i.value;
        }
    }

    let positivePercent = Math.trunc((positiveScore/totalScore)*100);
    let negativePercent = Math.trunc((negativeScore/totalScore)*100);
    let neutralPercent = Math.trunc((neutralScore/totalScore)*100);


    let sentimentChartScores = [
        {name: 'positive', value: positiveScore, colour: "#00bd00", percent: positivePercent+"%"},
        {name: 'negative', value: negativeScore, colour: "red", percent: negativePercent+"%"},
        {name: 'neutral', value: neutralScore, colour: "orange", percent: neutralPercent+"%"}
    ];

    return sentimentChartScores;
}

//Calculating space where percentages will appear
export function sectorFormula(cx,cy,midAngle,innerRadius,outerRadius,index)
{

    //Constant use for sector calculations in pie chart.
    const RADIAN = Math.PI / 180;

    /*
     * Formula for calculating space within a sector of the piechart.
     * Provided by recharts: https://recharts.org/en-US/examples
     * 
     */

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    let values = {x: x, y:y, radius: radius};

    return values;
}