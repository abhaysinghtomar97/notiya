import React from 'react';

import LandscapeVideoCarousel from '../LandscapeVideoCarousel';
export default function SkillsSection() {

    const Videos = [
        {
            url: "https://youtu.be/eIho2S0ZahI?si=dFCEdzov38y6QKgP",
            title: "PUBLIC SPEAKING"
        },
        {
            url: "https://youtu.be/HAnw168huqA?si=hzZt4t_Ik-8RTBUH",
            title: "Communication"
        },
        {
            url: "https://youtu.be/vyVpRiqOvt4?si=Iej1wj3IOPK3-xj5",
            title: "Writing online made Millionaire"
        },
        {
            url: "https://youtu.be/5MgBikgcWnY?si=Pbb5uyFEIv0CBm2J",
            title: "How to Learn Anyhting"
        },
        {
            url: "https://youtu.be/KkhivPQ8sbo?si=DE2Iq6aRCB6mp4Mh",
            title: "Productivity Workflow"
        },

        {
            url: "https://youtu.be/ms1nTeFO7ps?si=7r8UemIH1jzshDZa",
            title: "10:1 Chinese Secrete Rule"
        },
        {
            url: "https://youtu.be/c_ZJLJK5PjM?si=6jgECq4xwHfVtGxd",
            title: "Excel"
        }
    ];

    return (
        <div >
            <h2 className="text-2xl font-semibold mb-8 text-foreground">Master these Skills in 2026</h2>

            {/* Pass the array as a prop */}
            <LandscapeVideoCarousel videos={Videos} />

        </div>
    );
};

