package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class CelebrateDto {

    @NotNull(message = "게시글 id는 필수입니다.")
    @JsonProperty("post_id")
    private Long postId;

}

