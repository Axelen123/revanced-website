import { readable } from "svelte/store";

export interface Asset {
    name: string;
    size: string | null;
    url: string;
    content_type: string;
};

export interface Tool {
    repository: string;
    version: string;
    timestamp: string;
    assets: Asset[];
};

const fetchTools = async () => {
    const response = await fetch('https://releases.rvcd.win/tools');
    const json = await response.json();
    // API Returns repository and version info for each release asset.
    let data: Map<string, Tool> = new Map();
    for (const tool of json["tools"]) {
        const repo: string = tool.repository;

        if (!data.has(repo)) {
            data.set(repo, {
                version: tool.version,
                repository: repo,
                // Just use the timestamp of the first one we find.
                timestamp: tool.timestamp,
                assets: []
            });
        }

        let value = data.get(repo);
        value.assets.push({
            name: tool.name,
            size: tool.size,
            url: tool.browser_download_url,
            content_type: tool.content_type
        });

        data.set(repo, value);
    }
    return data;
};

const ToolsStore = readable(fetchTools());
export default ToolsStore;
