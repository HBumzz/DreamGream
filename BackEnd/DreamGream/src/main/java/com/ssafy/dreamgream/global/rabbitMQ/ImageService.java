package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.global.rabbitMQ.dto.PromptCreationProduceDto;
import com.ssafy.dreamgream.global.rabbitMQ.dto.PromptCreationConsumeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageCreationRequestProducer imageCreationRequestProducer;

    // 생성된 prompt를 producer에게 전달
    public void processImageCreation(Long sseId, ImageGenerateRequestDto dto) {

        // 선택된 카테고리, 성별, 태어난 연도
        String gender = "M";
        String birthyear = "1997";

        PromptCreationProduceDto produceDto = PromptCreationProduceDto.builder()
                .title(dto.getTitle())
                .categoryName(dto.getCategoryName())
                .gender(gender)
                .birthyear(birthyear)
                .build();

        String prompt = callPromptServer(produceDto);
        log.info("prompt: ", prompt);

        imageCreationRequestProducer.sendImageCreationRequest(sseId, prompt);
    }


    public void processImageResponse(Long sseId, String base64EncodedPhoto) {
        System.out.println("Received SSE ID: " + sseId);
        System.out.println("Received Base64 Encoded Photo: " + base64EncodedPhoto);
    }

    // 프롬프트 생성 서버로 프롬프트 생성 요청을 보냄
    public String callPromptServer(PromptCreationProduceDto dto) {
        String fastAPIUrl = "http://localhost:8002/prompt";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PromptCreationProduceDto> requestEntity = new HttpEntity<>(dto, headers);

        RestTemplate restTemplate = new RestTemplate();
        PromptCreationConsumeDto response = restTemplate.postForObject(fastAPIUrl, requestEntity, PromptCreationConsumeDto.class);

        return response.getImagePrompt();
    }

}