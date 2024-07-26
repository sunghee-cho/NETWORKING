package com.example.networking.job.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class SaraminApiService {
    private static final Logger logger = LoggerFactory.getLogger(SaraminApiService.class);

    @Value("${saramin.api.key}")
    private String accessKey;

    public String getExternalData() {
        try {
            String apiURL = "https://oapi.saramin.co.kr/job-search?access-key=" + accessKey 
            + "&keywords=it&bbs_gb=1&sr=directhire&job_type=4&edu_lv=&loc_cd=101000&fields=posting-date+expiration-date+keyword-code&start=1&count=30&job_mid_cd=2&job_cd=2232";

            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json");

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream(), "UTF-8"));
            }

            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            logger.info("API Response: " + response.toString());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response.toString());
            return jsonNode.toString();
        } catch (Exception e) {
            logger.error("Error fetching data", e);
            return e.toString();
        }
    }
}